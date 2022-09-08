// 动态命令行创建包的文件
export default (plop) => {
  plop.setGenerator('comp', {
    description: 'generate a component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'component name: '
      }
    ],
    actions: [
      {
        type: 'add',
        path: 'packages/{{name}}/package.json',
        templateFile: 'plop-templates/package.json.hbs'
      },
      {
        type: 'add',
        path: 'packages/{{name}}/index.module.css',
        templateFile: 'plop-templates/component.css.hbs'
      }
    ]
  })
}