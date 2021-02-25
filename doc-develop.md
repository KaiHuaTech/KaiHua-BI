## 开启 @emotion
### jsx-pragma
1. https://emotion.sh/docs/css-prop#jsx-pragma
2. https://babeljs.io/docs/en/babel-plugin-transform-react-jsx#pragma
### ts 使用 babel 插件开启 css-prop
1. https://github.com/emotion-js/emotion/blob/06b314725db578439181331691976beb41203cf5/docs/typescript.mdx#css-prop
If using the automatic runtime you should just add this to your tsconfig.json to let TypeScript know where it should look for the JSX namespace:
```
{
  "compilerOptions": {
    "jsxImportSource": "@emotion/react"
  }
}
```

## 更改 babel
```js
/* icejs-plugin */
config
  .module
  .rule('jsx')
  .use('babel-loader')
  // .options(value => console.log(value))
  .tap(({presets, plugins}) => ({
    presets: presets.map(o => {
      const [_preset, _options] = (Array.isArray(o) ? o : [o, {}])
      if (_preset.includes('@babel/preset-react')) {
        return [
          _preset,
          {
            ..._options,
            "runtime": "automatic", 
            "importSource": "@emotion/react"
          }
        ]
      } else {
        return o
      }
    }),
    plugins: ["@emotion/babel-plugin", ...plugins]
  }))
});

```
