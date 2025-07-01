# OFAM Brand Colors Reference

## Brand Color Palette

| Color | Hex Code | Usage |
|-------|----------|-------|
| **Primary Green** | `#677D3F` | Primary brand color, main CTAs, headers |
| **Secondary Orange** | `#F38D27` | Accent color, highlights, secondary CTAs |
| **Brand Dark** | `#1A1A1A` | Text, borders, dark elements |
| **Brand Light** | `#FFFAFA` | Backgrounds, light elements |

## Usage Examples

### Tailwind Classes

```tsx
// Using direct brand colors
<div className="bg-brand-primary text-brand-light">
  Primary background with light text
</div>

<button className="bg-brand-secondary text-white hover:bg-orange-400">
  Secondary CTA
</button>

// Using the extended color palette
<div className="bg-green-500 text-white">Brand green</div>
<div className="bg-orange-300 text-brand-dark">Brand orange</div>
```

### CSS Custom Properties

```css
.custom-element {
  background-color: var(--brand-primary);
  color: var(--brand-light);
  border: 1px solid var(--brand-secondary);
}
```

### Utility Classes

```tsx
// Pre-built button styles
<button className="brand-btn-primary">Primary Button</button>
<button className="brand-btn-secondary">Secondary Button</button>
<button className="contrast-btn">Outline Button</button>

// Text colors
<h1 className="text-brand-primary">Primary heading</h1>
<p className="text-brand-dark">Body text</p>

// Backgrounds
<div className="bg-brand-light">Light background</div>
<div className="bg-brand-primary">Primary background</div>
```

## Color Accessibility

- **Primary Green (#677D3F)** has sufficient contrast for white text
- **Secondary Orange (#F38D27)** has sufficient contrast for white text  
- **Brand Dark (#1A1A1A)** is suitable for body text on light backgrounds
- **Brand Light (#FFFAFA)** works well as a background color

## Design Guidelines

1. Use **Primary Green** for main CTAs and important UI elements
2. Use **Secondary Orange** for accents and secondary actions
3. Use **Brand Dark** for body text and borders
4. Use **Brand Light** for backgrounds and containers
5. Maintain proper contrast ratios for accessibility 