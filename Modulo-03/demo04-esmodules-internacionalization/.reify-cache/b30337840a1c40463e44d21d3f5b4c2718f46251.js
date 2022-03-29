"use strict";var describe,it;module.link('mocha',{describe(v){describe=v},it(v){it=v}},0);var expect;module.link('chai',{expect(v){expect=v}},1);var Person;module.link('./../src/person.js',{default(v){Person=v}},2);



describe('Person', () => {
  it('should return a person instance from a string', () => {
    const person = Person.generateInstanceFromString(
      '1 Bike,Carro 10000 2000-01-01 2002-02-02',
    );
    const expected = {
      from: '2000-01-01',
      to: '2002-02-02',
      vehicles: ['Bike', 'Carro'],
      kmTraveled: '10000',
      id: '1',
    };

    expect(person).to.be.deep.equal(expected);
  });

  it('should format values', () => {
    const person = new Person({
      from: '2000-01-01',
      to: '2002-02-02',
      vehicles: ['Bike', 'Carro'],
      kmTraveled: '10000',
      id: '1',
    });
    const result = person.formatted(person);
    const expected = {
      id: 1,
      vehicles: 'Bike e Carro',
      kmTraveled: '10.000 km',
      from: '01 de janeiro de 2000',
      to: '02 de fevereiro de 2002',
    };

    expect(result).to.be.deep.equal(expected);
  });
});
