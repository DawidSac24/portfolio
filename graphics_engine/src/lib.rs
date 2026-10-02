use wasm_bindgen::prelude::*;
use web_sys::console;

#[wasm_bindgen]
pub fn init_engine() {
    console::log_1(&"System Online: Rust Wasm Module Initialized".into());
}