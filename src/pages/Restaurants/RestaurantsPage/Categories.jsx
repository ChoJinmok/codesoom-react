import MenuList from '../MenuList';
import MenuItem from '../MenuItem';

export default function Categories({ categories, onClick, categoryId }) {
  return (
    <MenuList>
      {categories.map((category) => (
        <MenuItem
          key={category.id}
          active={category.id === categoryId}
        >
          <button
            type="button"
            onClick={() => onClick({
              field: 'categoryId',
              content: category.id,
            })}
          >
            {category.name}
          </button>
        </MenuItem>
      ))}
    </MenuList>
  );
}
