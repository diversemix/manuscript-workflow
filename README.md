# manuscript-workflow
An example workflow for a manuscript

## About
This is a small and simple code base to illustrate a workflow. This code is in `index.js` and it uses the [javascript-state-machine](https://github.com/jakesgordon/javascript-state-machine) library. It is intended as a start point to play around with.
 
## Running
The workflow diagram `workflow.png` is generated using [graphviz](http://graphviz.org/) - so you will need to ensure you have the `dot` executable installed. This can then be generated (and previewed) using:

```bash
npm install
npm start
```

## Sample Output
![Workflow](https://github.com/diversemix/manuscript-workflow/blob/master/workflow.png?raw=true)