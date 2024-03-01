import './index.css'

const PasswordItem = props => {
  const {eachAccount, showPassword, onDeleteItem} = props
  const {websiteName, userName, password, id} = eachAccount

  const onClickDeletePassword = () => {
    onDeleteItem(id)
  }
  return (
    <li>
      <div className="saved-password-details-container">
        <div className="website_initial_container">
          <p className="website_initial">{websiteName[0]}</p>
        </div>
        <div className="password-details">
          <p className="website-name">{websiteName}</p>
          <p className="user-name">{userName}</p>
          {showPassword ? (
            <p className="password">{password}</p>
          ) : (
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
              alt="stars"
              className="star-img"
            />
          )}
        </div>
      </div>
      <button
        type="button"
        className="delete-button"
        onClick={onClickDeletePassword}
        data-testid="delete"
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
          className="delete-icon"
        />
      </button>
    </li>
  )
}

export default PasswordItem
