
def check_imbalance(filepath):
    with open(filepath, 'r') as f:
        lines = f.readlines()
    
    count = 0
    import re
    for i, line in enumerate(lines):
        # Remove strings
        clean_line = re.sub(r'"[^"]*"', '', line)
        clean_line = re.sub(r"'[^']*'", '', clean_line)
        
        line_opening = clean_line.count('(')
        line_closing = clean_line.count(')')
        
        count += line_opening
        count -= line_closing
        
        if count < 0:
            print(f"Imbalance at line {i+1}: opening={line_opening}, closing={line_closing}, total={count}")
            print(line.strip())
            # count = 0 # Don't reset, find where it goes wrong
    
    print(f"Final total count: {count}")

check_imbalance('/Users/hasan/BJI_OMS_node_next/bjiweb/src/app/planning-reporting/PlanningReportingClient.tsx')
