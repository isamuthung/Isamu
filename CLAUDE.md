# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build Commands
- Install dependencies: `bundle install`
- Build site: `bundle exec jekyll build`
- Run development server: `bundle exec jekyll serve`
- Clean build artifacts: `bundle exec jekyll clean`

## Protected Files (DO NOT MODIFY)
- .github/workflows
- .ruby-version
- Gemfile
- _config.yml

## Site Structure Guidelines
- index.html is the Projects page (default view)
- Changes to index.html sidebar must also be made to _layouts/default.html
- Collection pages use markdown with frontmatter to inherit layouts:
  - _writings/ files inherit writings layout
  - _journal/ files inherit journal layout
  - _projects/ files will inherit projects layout when developed

## CSS Naming Conventions
- Use page-specific prefixes for all classes (e.g., `writings-`, `journal-`, `about-`, `projects-`)
- Keep global elements in default.css (sidebar, navigation, footer)
- Font families:
  - `font-family: 'Montserrat', sans-serif;` for body text and navigation
  - `font-family: 'Playfair Display', serif;` for headings and accent elements
- Never override fonts in page-specific CSS unless absolutely necessary

## Development Guidelines
- Add HTML/MD/CSS/JS files only to existing appropriate folders
- Use specific naming for variables and classes with page prefixes
- Keep CSS declarations that affect the sidebar in default.css only
- Do not create new folders without explicit permission