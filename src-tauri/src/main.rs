// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// fn main() {
//     mdview_tauri_lib::run()
// }

use std::env;
use std::fs;
use std::path::{Path, PathBuf};

#[tauri::command]
fn get_markdown_content() -> String {
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
            Ok(content) => content,
            Err(_) => format!("File not found: {}", resolved_path.display())
        }
    } else {
        "No file specified".to_string()
    }
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![get_markdown_content])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

