import { HeaderContainer } from './styles';
import { Scroll, Timer } from 'phosphor-react';

import igniteLogo from '../../assets/ignite-logo.svg';
import { NavLink } from 'react-router-dom';

export function Header() {
  return (
    <HeaderContainer>
      <img src={igniteLogo} />
      <nav>
        <NavLink to="/" title="Timer" end>
          <Timer size={24} />
        </NavLink>
        <NavLink to="/history" title="History">
          <Scroll size={24} />
        </NavLink>
      </nav>
    </HeaderContainer>
  );
}
