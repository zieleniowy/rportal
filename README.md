# rportal



### basic usage
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
        This div will be rendered in a container portal with the same id
    </div>
</Portal>
...
```
