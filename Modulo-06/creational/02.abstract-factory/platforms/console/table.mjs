import TableComponent from '../../shared/base/tableComponent.mjs';
import chalk from 'chalk';
import chalkTable from 'chalk-table';

export default class TableConsoleComponent extends TableComponent {
  render(data) {
    const columns = this.prepareData(data);
    const option = {
      left: 2,
      columns,
    };
    const table = chalkTable(option, data);
    console.log(table);
  }

  prepareData(data) {
    const [firstItem] = data;
    const header = Object.keys(firstItem);

    const formatHeader = (data, index) =>
      index % 2 === 0 ? chalk.yellow(data) : chalk.green(data);

    const columns = header.map((item, index) => ({
      field: item,
      name: formatHeader(index),
    }));

    return columns;
  }
}
