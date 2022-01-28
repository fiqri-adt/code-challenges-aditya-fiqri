import lodash from 'lodash'

export class FormatHelper {
  constructor() { }

  capitalize(s: string) {
    return lodash.capitalize(s)
  }
}