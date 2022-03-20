import { Controller } from '../src/hooks/Controller'

describe('controller', () => {
  // const fn = jest.fn()
  it.each`
    key       | props | config
    ${'fade'} | ${{}} | ${{}}
  `('check bind for $key', ({props}) => {
      const ctrl = new Controller(props)
      // const bind = ctrl.bind.bind(ctrl)
  })
})
