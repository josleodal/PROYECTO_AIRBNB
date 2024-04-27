export default function LoginPage(){

return (

    <div className="min-h-screen flex justify-center items-center pt-16">
    <div className="mb-64 max-w-lg w-full">
      <h1 className="text-4xl text-center mb-4">LOGIN</h1>
      <form>
        <input type="email" placeholder="your@email.com" className="w-full border my-1 py-2 px-3 rounded-2xl" />
        <input type="password" placeholder="Contraseña" className="w-full border my-1 py-2 px-3 rounded-2xl" />
        <button className="primary">Login</button>
      </form>
    </div>
  </div>
);





}