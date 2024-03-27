<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Testimonial;
use Faker\Generator as Faker;

class TestimonialFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    protected $model = Testimonial::class;

    public function definition()
    {
        return [
            'testimonial_author' => $this->faker->name,
            'testimonial_author_designation' => $this->faker->jobTitle,
            'testimonial_author_gender' => $this->faker->randomElement(['Male', 'Female']),
            'testimonial_feedback' => $this->faker->paragraph,
            'enabled' => $this->faker->boolean(90), // 90% chance of being true
        ];
    }
}
