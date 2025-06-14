// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// fn main() {
//     mdview_tauri_lib::run()
// }

use std::env;
use std::fs;
use std::path::Path;

#[tauri::command]
fn get_markdown_content() -> String {
    let args: Vec<String> = env::args().collect();
    if args.len() > 1 {
        let path = &args[1];
        let resolved_path = if Path::new(path).is_absolute() {
            path.to_string()
        } else {
            // 相対パスの場合、Cargo.tomlがある場所をプロジェクトルートとして解決
            let manifest_dir = env!("CARGO_MANIFEST_DIR");
            let project_root = Path::new(manifest_dir).parent().unwrap();
            project_root.join(path).to_string_lossy().to_string()
        };
        
        match fs::read_to_string(&resolved_path) {
            Ok(content) => content,
            Err(_) => format!("File not found: {}", resolved_path)
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

