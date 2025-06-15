// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// fn main() {
//     mdview_tauri_lib::run()
// }

use std::env;
use std::fs;
use std::path::{Path, PathBuf};
use std::sync::Mutex;

// グローバルな状態管理
static CURRENT_FILE_PATH: Mutex<Option<PathBuf>> = Mutex::new(None);

#[tauri::command]
fn get_markdown_content() -> String {
    // まず現在のファイルパスを確認
    {
        let current_path = CURRENT_FILE_PATH.lock().unwrap();
        if let Some(path) = current_path.as_ref() {
            match fs::read_to_string(path) {
                Ok(content) => return content,
                Err(_) => return format!("File not found: {}", path.display())
            }
        }
    }

    // 次にコマンドライン引数を確認
    let args: Vec<String> = env::args().collect();
    if args.len() > 1 {
        let path = &args[1];
        let resolved_path = if Path::new(path).is_absolute() {
            PathBuf::from(path)
        } else {
            // 相対パスの場合、実行時のカレントディレクトリから解決
            env::current_dir().unwrap_or_else(|_| PathBuf::from(".")).join(path)
        };
        
        match fs::read_to_string(&resolved_path) {
            Ok(content) => {
                // 成功した場合、現在のファイルパスを保存
                *CURRENT_FILE_PATH.lock().unwrap() = Some(resolved_path);
                content
            },
            Err(_) => format!("File not found: {}", resolved_path.display())
        }
    } else {
        "Click to select a markdown file".to_string()
    }
}

#[tauri::command]
async fn select_markdown_file(app_handle: tauri::AppHandle) -> Result<String, String> {
    use tauri_plugin_dialog::DialogExt;
    use std::sync::mpsc;
    
    let (tx, rx) = mpsc::channel();
    
    app_handle
        .dialog()
        .file()
        .add_filter("Markdown files", &["md", "markdown"])
        .pick_file(move |file_path| {
            tx.send(file_path).unwrap();
        });

    let file_path = rx.recv().map_err(|_| "Failed to receive file selection")?;

    match file_path {
        Some(path) => {
            match path.as_path() {
                Some(p) => {
                    let path_buf = PathBuf::from(p);
                    match fs::read_to_string(&path_buf) {
                        Ok(content) => {
                            // 成功した場合、現在のファイルパスを保存
                            *CURRENT_FILE_PATH.lock().unwrap() = Some(path_buf);
                            Ok(content)
                        },
                        Err(e) => Err(format!("Failed to read file: {}", e))
                    }
                },
                None => Err("Invalid file path".to_string())
            }
        },
        None => Err("No file selected".to_string())
    }
}

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init())
        .invoke_handler(tauri::generate_handler![get_markdown_content, select_markdown_file])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

