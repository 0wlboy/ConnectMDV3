const ClientRegister = () => {

  return(
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <form className="w-full max-w-md p-8 m-4 space-y-6 "
        action="submit">
          <div>
            <Label htmlFor="username" className="mb-2">
              Nombre de usuario
            </Label>
            <Input
              icon={"../assets/ICONS/person.svg"}
              id="username"
              type="text"
              placeholder="tunombredeusuario"
            />
          </div>
          <div>
            <Label htmlFor="password" className="mb-2">
              Contraseña
            </Label>
            <Input
              icon={"../assets/ICONS/lock.svg"}
              id="password"
              type="password"
              placeholder="••••••••"
            />
          </div>
          <Button className="w-full">Iniciar Sesión</Button>
        </form>
      </div>
    </>
  )

}

export default ClientRegister;