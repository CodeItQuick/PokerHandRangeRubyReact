export default (state = {}, { type, payload }) => {
    switch (type) {
      case 'SET_USER':
        return payload;
      case 'CLEAR_USER':
        return {};
      default:
        return state;
    }
  };