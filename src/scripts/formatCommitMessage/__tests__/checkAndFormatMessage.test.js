const { readFileSync, writeFileSync } = require('fs')
const { execSync } = require('child_process')

const { checkAndFormatMessage, mergeCommitType } = require('../checkAndFormatMessage')

jest.mock('fs', () => ({
  readFileSync: jest.fn(),
  writeFileSync: jest.fn(),
}))

jest.mock('child_process', () => ({
  execSync: jest.fn(),
}))

describe('checkAndFormatMessage', () => {
  const OLD_ENV = process.env
  const defaultBranchName = 'RWA-1'
  const testMessage = 'message'

  execSync.mockReturnValue(defaultBranchName)

  beforeEach(() => {
    jest.resetModules()
    process.env = { ...OLD_ENV }
  })

  afterEach(() => {
    process.env = OLD_ENV
  })

  test('should not update commit message if commit type is merge', () => {
    process.env.HUSKY_GIT_PARAMS = `${testMessage} ${mergeCommitType}`

    checkAndFormatMessage()

    expect(writeFileSync).not.toHaveBeenCalled()
  })

  test('should not update commit message if current branch is master', () => {
    const currentBranchName = 'master'
    process.env.HUSKY_GIT_PARAMS = testMessage

    execSync.mockReturnValueOnce(currentBranchName)

    checkAndFormatMessage()

    expect(writeFileSync).not.toHaveBeenCalled()
  })

  test('should not update commit message if message starts with issue tag', () => {
    process.env.HUSKY_GIT_PARAMS = testMessage

    readFileSync.mockReturnValueOnce('RWA-3: Testing')

    checkAndFormatMessage()

    expect(writeFileSync).not.toHaveBeenCalled()
  })

  test('should correctly update commit message if all conditions met', () => {
    process.env.HUSKY_GIT_PARAMS = testMessage

    const initialCommitMessage = 'Testing'
    const expectedCommitMessage = `${defaultBranchName}: ${initialCommitMessage}`

    readFileSync.mockReturnValueOnce(initialCommitMessage)

    checkAndFormatMessage()

    expect(writeFileSync).toHaveBeenCalledWith(testMessage, expectedCommitMessage, {
      encoding: 'utf-8',
    })
  })
})
