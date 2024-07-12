import './InputError.scss';
import ErrorIcon from '../../assets/icons/error.svg';

const InputError = ({ text }) => {
  return (
    <div className='error flex gap-1 items-center my-1'>
      <img src={ErrorIcon} alt="error icon"/>
      <p className='error__text'>{text ? text : 'This field is required'}</p>
    </div>
  )
}

export default InputError