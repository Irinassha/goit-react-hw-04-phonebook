import s from './Filter.module.css';

export const Filter = ({ filter, filterName }) => {
  return (
    <div className={s.filter}>
      <input
        className={s.filterInput}
        type="text"
        name="filter"
        value={filter}
        onChange={filterName}
      ></input>
    </div>
  );
};
