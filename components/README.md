# Components Directory

This directory contains reusable components organized in a clean and scalable structure.

## Directory Structure

```
/components
  /common         # Shared UI components used across the app
  /modals         # Modal components
  /calendar       # Calendar and cycle tracking related components
  /examples       # Example implementations using the components
```

## Common Components

These are the basic building blocks of the UI that can be used across the app:

- `Button.tsx` - Customizable button with various styles and variants
- `Card.tsx` - Container component with consistent styling and elevation
- `Header.tsx` - App header with profile and navigation icons
- `Icon.tsx` - Wrapper for icons with consistent styling
- `ProgressBar.tsx` - Visual indicator for progress with customizable colors
- `ProgressSummary.tsx` - Component to display progress statistics
- `RecommendationCard.tsx` - Card for displaying recommendations with completion status
- `SectionTitle.tsx` - Consistent section title component

## Modal Components

- `DayInfoModal.tsx` - Modal to display detailed information about a specific cycle day

## Calendar Components

- `CalendarDay.tsx` - Individual day component for the calendar
- `CalendarGrid.tsx` - Grid layout for the calendar
- `CycleTracker.tsx` - Component to visualize cycle progress

## Usage Examples

### Import Options

You can import components in several ways:

#### Option 1: Direct import (longer but explicit)

```tsx
import Button from '@/components/common/Button';
import Card from '@/components/common/Card';
```

#### Option 2: Import from category (recommended)

```tsx
import { Button, Card } from '@/components/common';
import { CycleTracker } from '@/components/calendar';
```

#### Option 3: Import from main components index (simplest)

```tsx
import { Button, Card, CycleTracker } from '@/components';
```

### Button Component

```tsx
import { Button } from '@/components';

// Basic usage
<Button title="Save" onPress={handleSave} />

// With variants
<Button 
  title="Delete" 
  variant="outline" 
  onPress={handleDelete} 
/>

// With icon
<Button 
  title="Add Item" 
  icon={<Plus size={16} color="#fff" />} 
  onPress={handleAdd} 
/>

// Full width and disabled
<Button 
  title="Submit" 
  fullWidth 
  disabled={!isValid} 
  onPress={handleSubmit} 
/>
```

### Card Component

```tsx
import { Card } from '@/components';

<Card>
  <Text>Card content goes here</Text>
</Card>

// With custom elevation and background color
<Card elevation="medium" backgroundColor="#F5E6DA">
  <Text>Card with custom styling</Text>
</Card>
```

### RecommendationCard Component

```tsx
import { RecommendationCard } from '@/components';

<RecommendationCard
  title="Workout"
  icon="🏃‍♀️"
  content="Try strength training today"
  isCompleted={completedTasks.has('workout')}
  onComplete={() => handleTaskComplete('workout', 5)}
/>
```

### CycleTracker Component

```tsx
import { CycleTracker } from '@/components';

<CycleTracker
  cycleDay={cycleDay}
  cycleLength={cycleLength}
  currentPhase={currentPhase}
  phaseInfo={phaseInfo}
/>
```

## Styling

Components use the centralized styling system from `@/styles/theme.ts` which includes:

- `colors` - Color palette for the app
- `spacing` - Consistent spacing values
- `typography` - Font sizes, weights, and line heights
- `borderRadius` - Border radius values
- `shadows` - Shadow styles for different elevations

This ensures consistent styling across the app and makes it easy to update the design system in one place.