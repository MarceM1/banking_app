'use client'

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"

import CustomInput from "./CustomInput"
import { authFormSchema } from "@/lib/utils"
import { Loader2 } from "lucide-react"
import { signIn, signUp } from "@/lib/actions/user.actions"
import { useRouter } from "next/navigation"




const AuthForm = ({ type }: { type: string }) => {
	const router = useRouter();
	const [user, setUser] = useState(null)
	const [isLoading, setIsLoading] = useState(false)

	const formSchema = authFormSchema(type);

	// Define  form.
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
			firstName: "",
			lastName: "",
			address1: "",
			state: "",
			postalCode: '',
			dateOfBirth: '',
			ssn: '',
			city1: '',
		},
	})

	//Define a submit handler.
	const onSubmit = async (data: z.infer<typeof formSchema>) => {
		// console.log("onSubmit llamado con datos:", data);
		// console.log("Envío del formulario iniciado");
		setIsLoading(true);
		// console.log("data: ", data)

		try {
			// Sign up with Appwrite & create plaid token
			// console.log("iniciado bloque try del sign-up:")
			if (type === 'sign-up') {
				const userData = {
					firstName: data.firstName!,
					lastName: data.lastName!,
					address1: data.address1!,
					city1: data.city1!,
					state: data.state!,
					postalCode: data.postalCode!,
					dateOfBirth: data.dateOfBirth!,
					ssn: data.ssn!,
					email: data.email,
					password: data.password
				}
				// console.log("antes del newUser")
				const newUser = await signUp(userData);

				setUser(newUser);
				console.log(newUser)
			}

			if (type === 'sign-in') {

				console.log("iniciado bloque try del sign-in:")
				const response = await signIn({
					email: data.email,
					password: data.password
				})
				if (response) router.push("/");

			}
		} catch (error) {
			console.error("error durante el registro", error);
		} finally {
			setIsLoading(false);
		}




		// const onSubmit = async (data: z.infer<typeof formSchema>) => {

		// 	setIsLoading(true)

		// 	// try {
		// 	// 	//sign up with Apprite and create plaid token


		// 	// 	// if (type === 'sign-up') {

		// 	// 	// 	const newUser = await signUp(data)
		// 	// 	// 	setUser(newUser)
		// 	// 	// 	console.log(newUser)

		// 	// 	// }
		// 	// 	// console.log(data)

		// 	// 	// if (type === 'sign-in') {
		// 	// 	// 	 const response = await signIn({
		// 	// 	// 	 	email: data.email,
		// 	// 	// 	 	password: data.password
		// 	// 	// 	 })
		// 	// 	// 	 if (response) router.push("/");
		// 	// 	// }

		// 	// } catch (error) {
		// 	// 	console.log(error)
		// 	// } finally {
		// 	// 	console.log(data)

		// 	// 	setIsLoading(false)


		// 	// }
	}

	return (
		<section className="auth-form">
			<header className="flex flex-col gap-5 md:gap-8">
				<Link href={"/"} className=" cursor-pointer flex items-center gap-1 px-4">
					<Image src="/icons/logo.svg" width={34} height={34} alt="Horizon logo" className="size-[24px] max-xl:size-14" />
					<h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">Horizon</h1>
				</Link>
				<div className="flex flex-col gap-1 md:gap-3">
					<h1 className="text-24 lg:text-36 font-semibold text-gray-900">{user ? 'Link Account' : type === 'sign-in' ? 'Sign In' : 'Sign Up'}</h1>
					<p className="text-16 font-normal text-gray-600">
						{
							user ? 'Link your account to get started' : 'Please enter your details'
						}
					</p>
				</div>
			</header>
			{user ? (
				<div className="flex flex-col gap-4">
					{/* PaidLink */}
				</div>
			) : (
				<>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
							{type === 'sign-up' && (
								<>
									<div className="flex gap-2">
										<CustomInput control={form.control} name="firstName" label="First Name" placeholder="ex: John" />
										<CustomInput control={form.control} name="lastName" label="Last Name" placeholder="ex: Doe" />
									</div>
									<CustomInput control={form.control} name="address1" label="Address" placeholder="Enter your specific address" />
									<CustomInput control={form.control} name="city1" label="City" placeholder="Enter your city" />
									<div className="flex gap-2">
										<CustomInput control={form.control} name="state" label="State" placeholder="ex: NY" />
										<CustomInput control={form.control} name="postalCode" label="Postal Code" placeholder="ex: 11101" />
									</div>
									<div className="flex gap-2">
										<CustomInput control={form.control} name="dateOfBirth" label="Date of birth" placeholder="yyyy-mm-dd" />
										<CustomInput control={form.control} name="ssn" label="SSN" placeholder="ex: 1234" />
									</div>
								</>
							)}
							<CustomInput control={form.control} name="email" label="Email" placeholder="Enter your email" />

							<CustomInput control={form.control} name="password" label="Password" placeholder="Enter your password" />

							<div className="flex flex-col gap-4">
								<Button type="submit" disabled={isLoading} className="form-btn">
									{isLoading ? (
										<>
											<Loader2 size={20} className="animate-spin" /> &nbsp;
											Loading...
										</>
									) : type === 'sign-in'
										? 'Sign In' : 'Sign Up'}
								</Button>

							</div>
						</form>
					</Form>

					<footer className="flex justify-center gap-1">
						<p className="text-14 font-normal text-gray-600">
							{
								type === 'sign-in' ? 'Don`t have an account?' : 'Already have an account?'
							}
						</p>
						<Link href={type === 'sign-in' ? '/sign-up' : '/sign-in'} className="form-link">{type === 'sign-in' ? 'Sign Up' : 'Sign In'}</Link>
					</footer>
				</>
			)}
		</section>
	)
}

export default AuthForm