/* eslint-env jest */
const Futaba = require('..')

/**
  Email addresses are generated using:
  https://www.randomlists.com/email-addresses?qty=10
 */
const EMAILS = [
  ['syncnine@mac.com', 'G5goNA=='],
  ['frikazoyd@mac.com', 'uXWBgw=='],
  ['njpayne@hotmail.com', '5dd0TA=='],
  ['madler@optonline.net', 'kKhmug=='],
  ['sravani@yahoo.com', 'NP7f8g=='],
  ['tokuhirom@live.com', '159q/w=='],
  ['gknauss@mac.com', 'yPb1rg=='],
  ['kildjean@optonline.net', 'O/nFfg=='],
  ['jwarren@aol.com', 'bGNaIQ=='],
  ['credmond@yahoo.ca', 'pKu81w==']
]

for (const [email, salt] of EMAILS) {
  it(`generated hash should match snapshot (email: ${email})`, () => {
    const f = Futaba.create(email, Buffer.from(salt, 'base64'))
    expect(f).toMatchSnapshot()
  })
}
