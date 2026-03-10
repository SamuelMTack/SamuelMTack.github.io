import re

# Read index.html
with open('index.html', 'r', encoding='utf-8') as f:
    html_content = f.read()

# Read the policy content you just created
with open('Policy_Content.txt', 'r', encoding='utf-8') as f:
    policy_content = f.read()

# Construct the article snippet
article_snippet = f"""
            <article id="tackapps">
                <h2 class="major">Tack Apps Privacy Policy</h2>
                <div class="privacy-policy-content">
                    {policy_content}
                </div>
            </article>
"""

# Insert article content right before the closing </div> <!-- /#main -->, specifically line 560
insertion_point = "        </div> <!-- /#main -->"
html_content = html_content.replace(insertion_point, f"{article_snippet}\n{insertion_point}", 1)

# Check if the navigation item was already updated
nav_target = '<li><a href="#website">Website</a></li>'
nav_addition = '\n                            <li><a href="#tackapps">Tack Apps</a></li>'
if nav_addition not in html_content:
   html_content = html_content.replace(nav_target, f"{nav_target}{nav_addition}", 1)


# Save modified html
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html_content)
print("Successfully modified index.html!")
