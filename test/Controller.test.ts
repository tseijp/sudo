import { Controller } from '../src/hooks/Controller'

describe('Controller', () => {
  // const fn = jest.fn()
  it.each`
    key    | props | config
    ${'1'} | ${{}} | ${{}}
  `('check bind for $key', ({props}) => {
        const ctrl = new Controller(props)
        // const bind = ctrl.bind.bind(ctrl)
  })
})
