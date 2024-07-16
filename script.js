// import { createClient } from '@supabase/supabase-js'
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.39.7/+esm'


// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

// Handle form submission
document.getElementById('uploadForm').addEventListener('submit', async (e) => {
  e.preventDefault()
  
  const imageFile = document.getElementById('imageInput').files[0]
  if (!imageFile) {
    alert('Please select an image file')
    return
  }

  try {
    // Upload file to Supabase bucket
    const { data, error } = await supabase.storage
      .from('images') //your bucket name
      .upload(`images/${Date.now()}_${imageFile.name}`, imageFile)

    if (error) throw error

    console.log('File uploaded successfully:', data.path)
    alert('Image uploaded successfully!')
  } catch (error) {
    console.error('Error uploading file:', error.message)
    alert('Error uploading image. Please try again.')
  }
})