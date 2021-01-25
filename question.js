// Nên sử dụng định dạng error nào trong 2 cái sau?
res.status(404).json({
  code: 404,
  reason: 'Not found',
  devMessage: 'Student not found',
  message: 'The resource you are looking for has been removed or is temporarily unavailable'
})

res.status(404).json({
  code: 404,
  message: 'Student not found'
})