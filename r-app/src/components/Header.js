import PropTypes from 'prop-types'
// import Button  from './Button'


const Header = ({ title ,onAdd,showAdd}) => {
  return (
        <header className='header'>
          <h1>{ title}</h1>
          <button  color='green' text={showAdd ? 'close' : 'add'} onClick={onAdd} className='btn'>Add</button>
        </header>
       )
}
Header.defaultProps = {
    title:'Task Tracker',
}

Header.propTypes = {
    title:PropTypes.string.isRequired,
}


export default Header