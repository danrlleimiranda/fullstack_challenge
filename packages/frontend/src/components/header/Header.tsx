import style from './header.module.css';
import ExitButton from '../exitButton/ExitButton';
import logo from '../../assets/aeternus-high-resolution-logo-transparent.svg';

export default function Header() {
  return (
    <div className={ style.header }>
      <img src={ logo } alt="" />
      <ExitButton />
    </div>
  );
}
