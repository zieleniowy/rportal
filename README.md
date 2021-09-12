# rportal

is a simple React package used to render components outside default React top-down rendering hierarchy.
With this package you can model any logical component hierarchy you want. You simply put 2 (or more) portals somewhere in your application
and children from one portal will be rendered in the second portal.
  
  
you can think of it as of portals in sci-fi movies. You enter portal in one place and leave it in other place. In this case you pass some react components
into portal with type="item" (entering portal), but they will be actually rendered in other place - in portal with type="container" (exit portal) and the same id.

## top-down hierarchy
By default, you render a parent and put all its children inside (and pass props for them). Then these children can render next level of children and so on.
That way app hierarchy looks like a tree in which all components can have multiple children but each has exactly one parent (except top most).
```
// tree view
 app
  |- child level 1
  |   |-child level 2
  |   |-child level 2
  |    
  |- child level 1
      |-child level 2 
         |-child level 3
```

```
// two components - one is rendering the second twice as its children.
const SomeChild = props => (<div>This is a child with props from a parent {JSON.stringify(props)}</div>)
const SomeParent = props => (
    <div>
        <SomeChild foo="bar" />
        <SomeChild x={3} />
    </div>
)

```

## with portal 
you can logically nest a component in any part of a tree (and pass its props from there) but actually render it in any other part of a tree.
```
// tree view with portal
 app
  |- child level 1
  |   |-child level 2
  |   |-child level 2
  |      |-portal item
  |          |-child nested in portal
  |    
  |- child level 1
  |   |-child level 2 
  |   |-child level 3
  |
  |-portal container
      |- child from portal item
```

You pass a children to a portal item (and pass props for them in there), but portal item won't actually render any elements in React virtual DOM. It will
instead pass them into a portal container, which will handle rendering.


## instalation
```
npm install rportal

//or

yarn install rportal
```

## basic usage

you need to create a container portal with some id and item portal with children you want to render in a container.


```
// import rportal at the top of files in which you'll use it
import Portal from 'rportal';


...
// insert a portal container in a place where children should be rendered
<Portal id="foo" type="container" />
...

...
<Portal id="foo" type="item">
    <div>
        This div will render in a container portal with the same id
    </div>
</Portal>
...
```
## multiple portals
You can have multiple portals with the same id. Every component with type container will render all children from each portal with type item.
  
What's more you can pass any props to a container portal. These props will be passed to all directly children rendered in a container (but won't override props 
passed directly to any child from inside item portal)

## caution
default react rendering policy makes app more readable and simpler in most cases. 
Although using portals seems to be very comfortable, it leads app to be more complicated. 
Every time you want to use this component, you should consider React recommended approach first. 
If your app is complicated, at first you should think of using some state management library like redux or recoil.

## sample usecases
- you want to render some link in menu based on current route. You create a portal container in a menu component.
 Then you put additional links (if any) directly in a page component instead of multiple if's (or switch) in a menu component.
 This way theres no need to modify a menu every time you add a new page, especially when additional links are also rendered based on page state.
- it may be useful in creating modals/dialogs
- plugin systems, CMSes - you may want to modify layout in multiple places (like: topbar, sidebar, footer, etc.) from a single place (plugin), so you just create a single
plugin component with multiple item portals.