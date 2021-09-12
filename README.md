# rportal

is a simple React package used to render components outside default React top-down rendering hierarchy.
With this package you can model any logical component hierarchy you want. You sipmly put 2 (or more) portals somewhere in your application
and children from one portal will be rendered in the second portal. 

## instalation
```
npm install rportal

//or

yarn install rportal
```

## basic usage

you need create a container portal with some id and item portal with children you want to render in a container.


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

## caution
default react rendering policy makes app more readable and simpler in most cases. 
Although using portals seems to be very comfortable, it leads app to be more complicated. 
Every time you want to use this component, you should consider React recommended approach first.

## sample usecases
- you want to render some link in menu based on current route. You create a portal container in a menu component.
 Then you put additional links (if any) directly in a page component instead of multiple if's (or switch) in a menu component.
 This way theres no need to modify a menu every time you add a new page, especially when additional links are also rendered based on page state.
- it may be useful in creating modals/dialogs
- plugin systems, CMSes - you may want to modify layout in multiple places (like: topbar, sidebar, footer, etc.) from a single place (plugin), so you just create a single
plugin component with multiple item portals.