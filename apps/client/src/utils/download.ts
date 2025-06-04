export const handleDownload = () => {
  const link = document.createElement('a');
  link.href = '/cv2025.pdf';
  link.download = 'CV-MatteoSoresini.pdf';
  link.click();
};
