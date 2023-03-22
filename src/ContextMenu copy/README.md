# React ContextMenu

React ContextMenu is a lightweight and customizable context menu implementation for React. It allows users to easily add context menus to their projects, making it easier for users to access actions and options relevant to the context in which they are working.

## Installation

To install React ContextMenu, simply run the following command:

```bash
npm install oasismenu
```

## Usage

To use React ContextMenu, you'll need to import it into your React project and add it to the relevant components. Here's an example of how to use it:

```jsx
import React from 'react';
import { ContextMenuBlock, ContextMenuTrigger, ContextMenu, ContextMenuItem, ContextMenuBreak } from 'oasismenu';

function App() {
    return (
        <>
            <ContextMenuBlock>
                <ContextMenuTrigger name="menu">
                    <button>Trigger button</button>
                </ContextMenuTrigger>
                <ContextMenu name="menu">
                    <ContextMenuItem onClick={() => alert("Menu Item 1")} content="Menu Item 1" />
                    <ContextMenuBreak />
                    <ContextMenuItem onClick={() => alert("Menu Item 2")} content="Menu Item 2" />
                    <ContextMenuBreak />
                    <ContextMenuItem onClick={() => alert("Menu Item 3")} content="Menu Item 3" />
                </ContextMenu>
            </ContextMenuBlock>
        </>
    );
};

export default App;
```

### Components

#### ContextMenuBlock

The `ContextMenuBlock` component should be placed once at the top level of your application as a parent where all the processing happens. This component acts as a container for all context menus and triggers within your application.

#### ContextMenuTrigger

The `ContextMenuTrigger` component is used to define the trigger element for your context menu. This can be any valid HTML element or custom React component. The `name` prop is used to associate the trigger with a specific context menu.

#### ContextMenu

The `ContextMenu` component defines the content of your context menu. It can contain any number of `ContextMenuItem` or `ContextMenuBreak` components. The name prop should be set to the same value as the name prop of the corresponding `ContextMenuTrigger`.

#### ContextMenuItem

The `ContextMenuItem` component defines a single item within your context menu. It can contain any valid HTML content, and the `onClick` prop should be set to a function that will be executed when the item is clicked.

#### ContextMenuBreak

The `ContextMenuBreak` component is used to insert a separator between items within your context menu.

React ContextMenu offers a wide range of customization options, so be sure to check out the [official documentation](https://github.com/shivamdevs/ContextMenu-component/blob/main/README.md) to learn more.

## Contributing

If you'd like to contribute to React ContextMenu, please feel free to submit a pull request or open an issue on the project's [GitHub repository](https://github.com/shivamdevs/ContextMenu-component).

## License

React ContextMenu is released under the [MIT license](https://choosealicense.com/licenses/mit/).
