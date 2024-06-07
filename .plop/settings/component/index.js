module.exports = {
  description: 'Creates a new component',
  prompts: [
    {
      type: 'list',
      name: 'componentType',
      message: 'What component do you want to create?',
      choices: ['atoms', 'molecules', 'organisms', 'templates']
    },
    {
      type: 'input',
      name: 'name',
      message: 'What is the name of the component?'
    }
  ],
  actions: [
    // index.ts
    {
      type: 'add',
      path: '../src/components/{{componentType}}/{{kebabCase name}}/index.ts',
      templateFile: 'templates/component/index.ts.hbs'
    },
    // component
    {
      type: 'add',
      path: '../src/components/{{componentType}}/{{kebabCase name}}/{{kebabCase name}}.tsx',
      templateFile: 'templates/component/component.tsx.hbs'
    }
  ]
}
