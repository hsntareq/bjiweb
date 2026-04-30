
import re

def check_jsx_balance(filepath):
    with open(filepath, 'r') as f:
        content = f.read()
    
    # Simple regex to find tags (not perfect but helpful)
    # Ignore self-closing tags like <img />, <input />, <UnitDawatModal ... />
    tags = re.findall(r'<([a-zA-Z0-9]+)|</([a-zA-Z0-9]+)>', content)
    
    stack = []
    for open_tag, close_tag in tags:
        if open_tag:
            # Check if it's self-closing in the original content (approximate)
            # This is hard with regex, let's just use a better approach
            pass
    
    # Let's try a different approach: find all <Tag and see if they are self-closing
    all_tags = re.findall(r'<(/?[a-zA-Z0-9]+)(\s[^>]*)?(>|/>)', content)
    
    stack = []
    for tag_name, attrs, end in all_tags:
        if end == '/>':
            continue # Self-closing
        
        if tag_name.startswith('/'):
            name = tag_name[1:]
            if not stack:
                print(f"Error: Unexpected closing tag </{name}>")
            else:
                top = stack.pop()
                if top != name:
                    print(f"Error: Mismatched tag. Expected </{top}>, found </{name}>")
        else:
            stack.append(tag_name)
    
    if stack:
        print(f"Error: Unclosed tags: {stack}")
    else:
        print("JSX tags seem balanced (approximate)")

check_jsx_balance('/Users/hasan/BJI_OMS_node_next/bjiweb/src/app/planning-reporting/PlanningReportingClient.tsx')
