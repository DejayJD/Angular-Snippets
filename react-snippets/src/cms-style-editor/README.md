# CMS Style Editor
Very often I run into situations where I need a lightweight templating engine 
to create readable serializable templates that can be rendered into plain text
 AND advanced components from plain strings/JSON.

I experimented with some approaches and ended up with this solution 
which takes advantage of the flexible nature of JSX and their approach to arrays.

I noticed that if you give react an array of values, it will just render them all together one by one. Ex.
```
const jsx = ["This is ", "only on ", "one line!"];
render() {
    return <div> {jsx} </div>;
}
// renders:
<div> This is only on one line! </div>
```

This means as long as all of those elements are valid JSX they can be rendered,
so you can add any type of component into that array
Ex.
```
const jsx = ["This is ", <div> some injected div! </div>, ()=>"functional component!")];
render() {
    return {jsx};
}
// renders:
<div> 
    This is 
    <div> some div! </div>
    functional component!
</div>
```

So I built a templating engine and an editor that takes advantage of this.

Check it out [here](https://dejayjd.github.io/Code-Snippets#cmseditor)
