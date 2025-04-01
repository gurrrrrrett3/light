# Derived from mkdocs-material's shortcodes: https://raw.githubusercontent.com/squidfunk/mkdocs-material/3cc0a30f6735e71a9f9262dc871419f7792628e5/src/overrides/hooks/shortcodes.py

import posixpath
import re

from mkdocs.config.defaults import MkDocsConfig
from mkdocs.structure.files import File, Files
from mkdocs.structure.pages import Page
from re import Match

def on_page_markdown(
    markdown: str, *, page: Page, config: MkDocsConfig, files: Files
):
    # Replace callback
    def replace(match: Match):
        type, args = match.groups()
        args = args.strip()

        if type == "client": return f'<a href="/light/api/#tag-client" target="_blank"><span class="md-tag md-tag-icon md-tag--client">Client</span></a>'
        elif type == "server": return f'<a href="/light/api/#tag-server" target="_blank"><span class="md-tag md-tag-icon md-tag--server">Server</span></a>'
        elif type == "shared": return f'<a href="/light/api/#tag-shared" target="_blank"><span class="md-tag md-tag-icon md-tag--shared">Shared</span></a>'
        elif type == "sync": return f'<a href="/light/api/#tag-sync" target="_blank"><span class="md-tag md-tag-icon md-tag--sync">Synchronous</span></a>'
        elif type == "async": return f'<a href="/light/api/#tag-async" target="_blank"><span class="md-tag md-tag-icon md-tag--async">Yielding</span></a>'
        elif type == "errors": return f'<a href="/light/api/#tag-errors" target="_blank"><span class="md-tag md-tag-icon md-tag--errors">Errors</span></a>'
        elif type == "experimental": return f'<a href="/light/api/#tag-experimental" target="_blank"><span class="md-tag md-tag-icon md-tag--experimental">Experimental</span></a>'
        elif type == "internal": return f'<a href="/light/api/#tag-internal" target="_blank"><span class="md-tag md-tag-icon md-tag--internal">Internal</span></a>'

        # Otherwise, raise an error
        raise RuntimeError(f"Unknown shortcode: {type}")

    # Find and replace all external asset URLs in current page
    return re.sub(
        r"<!-- (\w+)(.*?) -->",
        replace, markdown, flags = re.I | re.M
    )

# -----------------------------------------------------------------------------

# Resolve path of file relative to given page - the posixpath always includes
# one additional level of `..` which we need to remove
def _resolve_path(path: str, page: Page, files: Files):
    path, anchor, *_ = f"{path}#".split("#")
    path = _resolve(files.get_file_from_path(path), page)
    return "#".join([path, anchor]) if anchor else path

# Resolve path of file relative to given page - the posixpath always includes
# one additional level of `..` which we need to remove
def _resolve(file: File, page: Page):
    path = posixpath.relpath(file.src_uri, page.file.src_uri)
    return posixpath.sep.join(path.split(posixpath.sep)[1:])

# -----------------------------------------------------------------------------
