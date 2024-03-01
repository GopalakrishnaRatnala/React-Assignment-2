import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import './index.css'
import PasswordItem from '../PasswordItem'

class PasswordManager extends Component {
  state = {
    savedPasswords: [],
    websiteName: '',
    userName: '',
    password: '',
    filteredPassword: [],
    showPassword: false,
  }

  onClickAddPassword = event => {
    event.preventDefault()
    const {websiteName, userName, password} = this.state
    const newAccount = {websiteName, userName, password, id: uuidv4()}
    this.setState(prevState => ({
      savedPasswords: [...prevState.savedPasswords, newAccount],
      websiteName: '',
      userName: '',
      password: '',
    }))
  }

  onDeleteItem = id => {
    const {savedPasswords, filteredPassword} = this.state
    const reqPasswordsList = savedPasswords.filter(
      eachPassword => eachPassword.id !== id,
    )
    const updatedFilteredPassword = filteredPassword.filter(
      eachPassword => eachPassword.id !== id,
    )

    this.setState({
      savedPasswords: reqPasswordsList,
      filteredPassword: updatedFilteredPassword,
    })
  }

  onChangeFilterPasswords = event => {
    this.setState(prevState => ({
      filteredPassword: prevState.savedPasswords.filter(eachAccount =>
        eachAccount.websiteName
          .toLowerCase()
          .includes(event.target.value.toLowerCase()),
      ),
    }))
  }

  toggleShowPassword = () => {
    this.setState(prevState => ({showPassword: !prevState.showPassword}))
  }

  onChangeWebsite = event => {
    this.setState({websiteName: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({userName: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {
      userName,
      password,
      websiteName,
      savedPasswords,
      filteredPassword,
      showPassword,
    } = this.state
    return (
      <div className="app-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="app-logo"
        />
        <div className="img-and-user-inputs-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png "
            alt="password manager"
            className="passwordManager-img"
          />
          <form className="inputs-container" onSubmit={this.onClickAddPassword}>
            <h1 className="add-password-heading">Add New Password</h1>
            <div className="input-container">
              <div className="logo-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  alt="website"
                  className="logo"
                />
              </div>
              <input
                className="input"
                type="text"
                placeholder="Enter Website"
                onChange={this.onChangeWebsite}
                value={websiteName}
              />
            </div>
            <div className="input-container">
              <div className="logo-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  alt="username"
                  className="logo"
                />
              </div>
              <input
                className="input"
                type="text"
                placeholder="Enter Username"
                onChange={this.onChangeUsername}
                value={userName}
              />
            </div>
            <div className="input-container">
              <div className="logo-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                  alt="password"
                  className="logo"
                />
              </div>
              <input
                className="input"
                type="password"
                placeholder="Enter Password"
                onChange={this.onChangePassword}
                value={password}
              />
            </div>
            <button type="submit" className="button">
              Add
            </button>
          </form>
        </div>
        <div className="display-passwords-container">
          <div className="passwords-counter-and-search-container">
            <div className="password-container">
              <h1 className="your-password-text">Your Passwords</h1>
              <div className="display-counter-container">
                <p className="counter-text">{savedPasswords.length}</p>
              </div>
            </div>
            <div className="search-input-container">
              <div className="search-logo-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                  alt="search"
                  className="search-logo"
                />
              </div>
              <input
                className="search-input"
                type="search"
                placeholder="Search"
                onChange={this.onChangeFilterPasswords}
              />
            </div>
          </div>
          <hr />
          <div className="saved-passwords-container">
            <div className="input-checkbox-container">
              <input
                type="checkbox"
                id="checkBox"
                className="input-checkbox"
                onClick={this.toggleShowPassword}
              />
              <label htmlFor="checkBox">Show Passwords</label>
            </div>
          </div>
          {filteredPassword.length === 0 && savedPasswords.length === 0 && (
            <div className="no-passwords-img-text-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                alt="no passwords"
                className="no-passwords-img"
              />
              <p className="no-passwords-text">No Passwords</p>
            </div>
          )}
          {filteredPassword.length > 0 ? (
            <ul>
              {filteredPassword.map(eachAccount => (
                <PasswordItem
                  eachAccount={eachAccount}
                  key={eachAccount.id}
                  showPassword={showPassword}
                  onDeleteItem={this.onDeleteItem}
                />
              ))}
            </ul>
          ) : (
            <ul>
              {savedPasswords.map(eachAccount => (
                <PasswordItem
                  eachAccount={eachAccount}
                  key={eachAccount.id}
                  showPassword={showPassword}
                  onDeleteItem={this.onDeleteItem}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default PasswordManager
