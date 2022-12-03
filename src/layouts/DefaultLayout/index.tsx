import { Outlet } from 'react-router-dom';
import { Header } from '../../components/Header';
import { CyclesProvider } from '../../contexts/CyclesContext';

import { LayoutContainer } from './styles';

export function DefaultLayout() {
  return (
    <LayoutContainer>
      <Header />
      <CyclesProvider>
        <Outlet />
      </CyclesProvider>
    </LayoutContainer>
  );
}
