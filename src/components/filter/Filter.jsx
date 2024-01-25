import s from './Filter.module.css';

export const Filter = ({ filters, filterName }) => {
  return (
    <div className={s.filter}>
      <input
        className={s.filterInput}
        type="text"
        name="filter"
        value={filters}
        onChange={filterName}
      ></input>
    </div>
  );
};
