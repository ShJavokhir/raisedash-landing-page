# Rails Utilities

CSS utilities that add subtle divider lines to elements, similar to Tailwind CSS website's grid lines. Includes both vertical (side) and horizontal rails.

## Usage

### Basic Side Rails
```jsx
<div className="ui-side-rails">
  <YourComponent />
</div>
```

### With Fade Effect
```jsx
<div className="ui-side-rails ui-side-rails--fade">
  <YourComponent />
</div>
```

### Custom Offset
```jsx
<div 
  className="ui-side-rails" 
  style={{ '--rails-offset': '3rem' } as React.CSSProperties}
>
  <YourComponent />
</div>
```

### Edge-to-Edge Rails
```jsx
<div className="ui-side-rails ui-side-rails--offset-0">
  <YourComponent />
</div>
```

## Available Classes

### Vertical (Side) Rails
- `.ui-side-rails` - Base utility, adds vertical lines
- `.ui-side-rails--fade` - Lines fade out at the bottom
- `.ui-side-rails--offset-0` - Lines at exact edges (no offset)

### Horizontal Rails
- `.ui-horizontal-rails` - Base utility, adds horizontal lines (top/bottom)
- `.ui-horizontal-rails--fade` - Lines fade out at the edges
- `.ui-horizontal-rails--offset-0` - Lines at exact edges (no offset)

### Simple Horizontal Line
- `.ui-hr-line` - Simple horizontal line with fade effect

## Customization

- **Offset**: Use CSS custom property `--rails-offset` (default: `1rem`)
- **Fade**: Adjust fade length with `--rails-fade-size` (default: `8%`)
- **Color**: Automatically uses theme's `--color-border` token
- **Theme**: Works with both light and dark modes

## Examples

### Vertical Rails
```jsx
// Card with side rails
<div className="ui-side-rails ui-side-rails--fade" style={{ '--rails-offset': '2rem' }}>
  <Container className="bg-white dark:bg-card rounded-md border">
    <CardContent />
  </Container>
</div>

// Section with edge rails
<div className="ui-side-rails ui-side-rails--offset-0">
  <SectionContent />
</div>
```

### Horizontal Rails
```jsx
// Section with horizontal dividers
<div className="ui-horizontal-rails ui-horizontal-rails--fade" style={{ '--rails-offset': '2rem' }}>
  <SectionContent />
</div>
```

### Two Lines with Centered Text
```jsx
// Two horizontal lines with text between them
<div className="py-6">
  <div className="ui-hr-line" />
  <div className="flex items-center justify-center py-3">
    <span className="text-sm text-muted-foreground bg-background px-4">
      Trusted by leading companies
    </span>
  </div>
  <div className="ui-hr-line" />
</div>
```
