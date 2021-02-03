// Cách e return về {code, data} như dưới có ổn không?
// Có cách nào khác tốt hơn không?
const update = async (id, data) => {
  try {
    const updateUser = await Student.findByIdAndUpdate(id, data);
    if (updateUser) {
      return {code: 200, data: data}
    } else {
      return {code: 404, data: null}
    }
  } catch (err) {
    return {code: 400, data: err}
  }
};