import { formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { useCyclesContext } from '../../contexts/CyclesContext';
import {
  HistoryContainer,
  HistoryList,
  Status,
  WithoutHistoryMessage,
} from './styles';

export function History() {
  const { cycles } = useCyclesContext();

  return (
    <HistoryContainer>
      <h1>Meu histórico</h1>

      {cycles.length > 0 ? (
        <HistoryList>
          <table>
            <thead>
              <tr>
                <th>Tarefa</th>
                <th>Duração</th>
                <th>Início</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {cycles.length > 0 &&
                cycles.map(cycle => (
                  <tr key={cycle.id}>
                    <td>{cycle.task}</td>
                    <td>
                      {String(cycle.minutesAmount).padStart(2, '0')} minutos
                    </td>
                    <td>
                      {formatDistanceToNow(new Date(cycle.startDate), {
                        addSuffix: true,
                        locale: ptBR,
                      })}
                    </td>
                    <td>
                      {cycle.finishedDate && (
                        <Status statusColor="green">Concluido</Status>
                      )}
                      {cycle.interruptedDate && (
                        <Status statusColor="red">Interrompido</Status>
                      )}
                      {!cycle.finishedDate && !cycle.interruptedDate && (
                        <Status statusColor="yellow">Em andamento</Status>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </HistoryList>
      ) : (
        <WithoutHistoryMessage>
          Não há histórico disponível
        </WithoutHistoryMessage>
      )}
    </HistoryContainer>
  );
}
