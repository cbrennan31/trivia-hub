module.exports = {
  valid: (obj) => {
    if ( obj.answer.includes(`(`) )
    {
      return false
    } else {
      return true
    }
  }
}
