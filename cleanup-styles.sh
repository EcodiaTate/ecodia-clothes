#!/bin/bash
find src -name "*.tsx" -type f | while read f; do
  # Remove className={cn(...)} patterns
  perl -i -pe 's/\s*className=\{cn\([^}]+\)\}//' "$f"
  # Remove empty className props
  perl -i -pe 's/\s*className=\{\}//' "$f"
  # Remove className="..." 
  perl -i -pe 's/\s*className="[^"]*"//' "$f"
  # Remove cn() calls that span multiple lines
  perl -i -0777 -pe 's/className=\{cn\(\s*[^{]*?\s*\)\}//gs' "$f"
done
echo "Cleanup complete"
