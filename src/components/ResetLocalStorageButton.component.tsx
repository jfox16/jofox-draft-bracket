
const resetLocalStorage = () => {
  localStorage.clear();
}

export const ResetLocalStorageButton = () => {
  return (
    <p onClick={resetLocalStorage} style={{color: '#555555', cursor: 'pointer', marginTop: 50}}>
      Reset Local Storage
    </p>
  )
}
