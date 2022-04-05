import TableComponent from '../../shared/base/tableComponent.mjs';

export default class TableBrowserComponent extends TableComponent {
  render(data) {
    const template = this.prepareData(data);
    document.body.insertAdjacentHTML('afterbegin', template);
  }

  prepareData(data) {
    const [firsItem] = data;
    const tHeaders = Object.keys(firsItem).map(
      (text) => `<th scope="col">${text}</th>`,
    );
    const joinList = (list) => list.join('');
    const tBody = data
      .map((item) => Object.values(item))
      .map((item) => item.map((value) => `<td>${value}</td>`))
      .map((tds) => `<tr>${joinList(tds)}</tr>`);
    const template = `
    <table>
      <thead>
          <tr>${joinList(tHeaders)}</tr>
      </thead>
      <tbody>
        ${joinList(tBody)}
      </tbody>
    </table>
    `;

    return template;
  }
}
