import json
import os

def convert_json_to_ts():
    json_path = r"d:\học tiếng nhật\public\data\grammar"
    ts_path = r"d:\học tiếng nhật\src\data\grammar"
    
    if not os.path.exists(ts_path):
        os.makedirs(ts_path)
        
    levels = ["n5", "n4", "n3", "n2", "n1"]
    
    # Process each level
    for level in levels:
        json_file = os.path.join(json_path, f"{level}.json")
        ts_file = os.path.join(ts_path, f"grammar_{level}.ts")
        
        if os.path.exists(json_file):
            with open(json_file, "r", encoding="utf-8") as f:
                data = json.load(f)
            
            # Create content for TS file
            ts_content = f'import {{ Grammar }} from "@/types/grammar";\n\n'
            ts_content += f'export const grammar_{level}: Grammar[] = {json.dumps(data, ensure_ascii=False, indent=4)};\n'
            
            with open(ts_file, "w", encoding="utf-8") as f:
                f.write(ts_content)
                
            print(f"✅ Created {ts_file}")
        else:
            print(f"⚠️ Warning: Expected {json_file} does not exist.")

    # Create the main export file
    main_ts_file = r"d:\học tiếng nhật\src\data\grammar.ts"
    main_content = 'import { Grammar } from "@/types/grammar";\n'
    
    # Filter only existing levels
    existing_levels = [l for l in levels if os.path.exists(os.path.join(ts_path, f"grammar_{l}.ts"))]
    
    for level in existing_levels:
        main_content += f'import {{ grammar_{level} }} from "./grammar/grammar_{level}";\n'
    
    main_content += '\nexport const mockGrammar: Grammar[] = [\n'
    for level in existing_levels:
        main_content += f'    ...grammar_{level},\n'
    main_content += '];\n\n'
    
    # Also export individual levels if needed
    if existing_levels:
         main_content += f'export {{ {", ".join([f"grammar_{l}" for l in existing_levels])} }};\n'

    with open(main_ts_file, "w", encoding="utf-8") as f:
        f.write(main_content)
        
    print(f"✅ Updated {main_ts_file}")

if __name__ == "__main__":
    convert_json_to_ts()
