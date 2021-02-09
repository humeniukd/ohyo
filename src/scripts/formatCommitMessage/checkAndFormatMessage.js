const fs = require('fs')
const { execSync } = require('child_process')

const mergeCommitType = 'merge'

module.exports.mergeCommitType = mergeCommitType

module.exports.checkAndFormatMessage = () => {
  const JIRA_BOARD_IDS = ['RWA']

  const issueRegex = new RegExp(`(${JIRA_BOARD_IDS.join('|')})-\\d+`, 'g')
  const msgRegex = new RegExp(`(${JIRA_BOARD_IDS.join('|')})-\\d+.+`, 'g')
  const gitParams = process.env.HUSKY_GIT_PARAMS.split(' ')
  const [messageFile, commitType] = gitParams
  const message = fs.readFileSync(messageFile, { encoding: 'utf-8' })
  const branchName = execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf-8' })
  const issueTag = issueRegex.test(branchName) && branchName.match(issueRegex)[0]
  const isMergeBranch = commitType === mergeCommitType
  const isMasterBranch = /^master/.test(branchName)

  if (!issueTag && !isMasterBranch) {
    if (!msgRegex.test(message)) {
      // eslint-disable-next-line no-console
      console.log(
        'A commit should start from a Jira issue ID and describe the goal/result of changes, e.g.: RWA-1: Send notification about card transactions to users that have such notifications enabled in settings',
        'Rejecting!',
      )
      process.exit(1)
    }
  } else {
    if (isMergeBranch || isMasterBranch || msgRegex.test(message)) {
      return
    }

    const newMessage = `${issueTag.toUpperCase()}: ${message}`
    fs.writeFileSync(messageFile, newMessage, { encoding: 'utf-8' })

    // eslint-disable-next-line no-console
    console.log(`Jira issue ${issueTag} prepended to commit message`)
  }
}
